import { Delete, Favorite } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { AppModalService } from "../../components";
import { useAppLanguage, useMutateTodo } from "../../hooks";
import { FetchApi } from "../../utils/modules";
import Add from "./items/Add";
import Edit from "./items/Edit";

function UserItem({ data, onOpenEditModal, onDelete }) {
  const { Strings } = useAppLanguage();
  const [isLike, setIsLike] = useState(false);
  const navigate = useNavigate();

  const onToggleLike = () => {
    setIsLike((prev) => !prev);
  };

  const onGoDetail = () => {
    // AppModalService.set({ title: "123", children: "khong biet modal la j" });
    navigate(`/users/${data.phone}`, { data: data });
  };
  const onEdit = () => {
    onOpenEditModal(data);
  };

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        height: 380,
        justifyContent: "space-between",
      }}>
      <CardMedia
        component="img"
        height="200"
        image={data.picture.large}
        alt="green iguana"
      />
      <CardContent>
        <Typography noWrap variant="h5">
          {data.name.title + " " + data.name.first + " " + data.name.last}
        </Typography>
        <Typography noWrap variant="body2" color="text.secondary">
          {Strings.email}: {data.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {Strings.phone}: {data.phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {Strings.age}: {data.dob.age}
        </Typography>
      </CardContent>
      <Grid container style={{ justifyContent: "space-between", mb: 2 }}>
        <Grid item sx={{ alignItems: "center", pb: 1 }}>
          <Button size="medium" onClick={onGoDetail}>
            {Strings.detail}
          </Button>
          <Button size="medium" onClick={onEdit}>
            {Strings.edit_user}
          </Button>
        </Grid>
        <Grid item>
          <Favorite
            onClick={onToggleLike}
            sx={{ mr: 2, cursor: "pointer" }}
            color={isLike ? "error" : "disabled"}
          />
          <Delete
            color="error"
            sx={{ mr: 1, cursor: "pointer" }}
            onClick={() => onDelete(data.phone, data.email)}
          />
        </Grid>
      </Grid>
    </Card>
  );
}

function Users() {
  const { Strings } = useAppLanguage();
  const { data, isLoading, isFetching } = useQuery("v1.0/users", () =>
    FetchApi.getUsers(10)
  );
  const setData = useMutateTodo("v1.0/users");
  const { enqueueSnackbar } = useSnackbar();

  if (isLoading || isFetching) {
    return <CircularProgress style={{ marginLeft: "46%", marginTop: 60 }} />;
  }

  const onOpenAddModal = () => {
    AppModalService.set({
      title: Strings.add_user,
      noFooter: true,
      children: <Add setData={setData} data={data} />,
    });
  };
  const onOpenEditModal = (itemData) => {
    AppModalService.set({
      title: Strings.edit_user,
      noFooter: true,
      children: <Edit setData={setData} data={data} itemData={itemData} />,
    });
  };
  const onDelete = (phone, email) => {
    AppModalService.set({
      title: Strings.do_you_wanna_delete_user,
      onConfirm: () => {
        const clone = [...data.results];
        const index = clone.findIndex(
          (item) => item.phone == phone && item.email == email
        );
        if (index > -1) {
          clone.splice(index, 1);
        }
        setData.mutate({ ...data, results: clone });
        AppModalService.close();
        enqueueSnackbar(Strings.deleted_success_common, { variant: "success" });
      },
    });
  };

  return (
    <Container>
      <Grid container sx={{ justifyContent: "flex-end" }}>
        <Button onClick={onOpenAddModal} sx={{ my: 2 }} variant="contained">
          {Strings.add_user}
        </Button>
      </Grid>
      <Grid container sx={{ mb: 2 }} spacing={2}>
        {(data?.results || []).map((item, index) => (
          <Grid lg={4} xs={12} item key={`${index}`}>
            <UserItem data={item} onOpenEditModal={onOpenEditModal} onDelete={onDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Users;
