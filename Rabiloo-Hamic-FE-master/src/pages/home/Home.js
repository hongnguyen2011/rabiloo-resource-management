import {Container, Grid, Typography, TypographyVariant} from '@mui/material';
import {useAppLanguage} from '../../hooks';
import HomeFeaturedPost from './items/HomeFeaturedPost';
import HomeFeaturedPosts from './items/HomeFeaturedPosts';
import HomeSidebar from './items/HomeSidebar';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

function Home() {
  const {Strings} = useAppLanguage();

  const mainFeaturedPost = {
    title: 'Top Software Development Company',
    description:
      'Rabiloo là công ty phần mềm hàng đầu Việt Nam. Chúng tôi chuyên phát triển phần mềm và tư vấn giải pháp công nghệ cho thị trường Nhật Bản, Mỹ, Pháp, và thế giới.',
    image: 'https://rabiloo.com/images/recruitment/banner_mobile.jpg',
    imageText: 'main image description',
    linkText: Strings.continue_reading,
  };

  const featuredPosts = [
    {
      title: 'Sức mạnh của công nghệ được chuyển hóa bằng tài năng Rabiloo',
      date: 'Nov 12',
      description:
        'Đặt tâm huyết và trí tuệ vào từng sản phẩm, chúng tôi tự hào mang tới dịch vụ và sản phẩm công nghệ chất lượng đạt chuẩn quốc tế...',
      image: 'https://rabiloo.com/images/about/mission.png',
      imageLabel: 'Image Banner',
    },
    {
      title: 'Dịch vụ phát triển phần mềm',
      date: 'Nov 11',
      description:
        'Nghiên cứu, tư vấn, thiết kế phần mềm với giao diện và chức năng đáp ứng theo yêu cầu của khách hàng. Hợp tác phát triển trên 2 hình thức: Labo outsourcing và Project-based outsourcing.',
      image: 'https://rabiloo.com/images/homepage/about-block.svg',
      imageLabel: 'Image Banner',
    },
  ];

  const sidebar = {
    title: Strings.about,
    description:
      '“Rabiloo” là cách đọc chuyển âm xuất phát từ ba từ “Ra biển lớn. Rabiloo như một con thuyền gồm những thủy thủ tràn đầy năng lượng nhiệt huyết nhổ neo cùng đi tìm lý tưởng sống và hạnh phúc cho chính mình.“Never stop surfing”.Slogan thể hiện tinh thần nỗ lực không ngừng, sẵn sàng đối mặt với những thử thách, sẵn sàng học hỏi công nghệ mới để bắt kịp với tốc độ thay đổi của công nghệ.',

    social: [
      {name: 'GitHub', icon: GitHubIcon},
      {name: 'Twitter', icon: TwitterIcon},
      {name: 'Facebook', icon: FacebookIcon},
    ],
  };

  return (
    <Container sx={{my: 3}} maxWidth="lg">
      <HomeFeaturedPost post={mainFeaturedPost} />
      <Grid container spacing={4}>
        {featuredPosts.map(post => (
          <HomeFeaturedPosts key={post.title} post={post} />
        ))}
      </Grid>
      <Grid container spacing={4} sx={{mt: 3}}>
        <Grid item xs={12} md={8}>
          <Typography sx={{my: 4}}>
            4/2017: Bắt đầu dự án đầu tiên tại Việt Nam với 3 thành viên. Nhà
            sáng lập: Ngô Ngọc Cường.
          </Typography>
          <Typography sx={{my: 4}}>
            5/2017: Hợp tác phát triển dự án thành công đầu tiên với khách hàng
            Nhật Bản.
          </Typography>
          <Typography sx={{my: 4}}>
            3/2018: Chiến thắng hợp đồng sản xuất phần mềm đầu tiên tại Mỹ, mở
            rộng thị trường sang Pháp, Singapore.
          </Typography>
          <Typography sx={{my: 4}}>
            7/2019: Tham dự sự kiện về công nghệ thông tin lớn nhất tại Nhật Bản
            - Japan IT Week.
          </Typography>
          <Typography sx={{my: 4}}>
            7/2020: Đạt mốc 100+ nhân sự và 180 dự án thành công.
          </Typography>
          <Typography sx={{my: 4}}>
            2021: Hoàn thiện thủ tục pháp lý đăng ký giấy phép mở chi nhánh tại
            Nhật Bản.
          </Typography>
        </Grid>
        <HomeSidebar
          title={sidebar.title}
          description={sidebar.description}
          social={sidebar.social}
        />
      </Grid>
    </Container>
  );
}

export default Home;
