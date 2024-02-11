import { useMutation, useQueryClient } from "react-query";

const useMutateTodo = (key) => {
  const queryClient = useQueryClient();

  return useMutation(key, {
    onMutate: (data) => {
      queryClient.setQueryData(key, data);
    },
  });
};

export { useMutateTodo };
