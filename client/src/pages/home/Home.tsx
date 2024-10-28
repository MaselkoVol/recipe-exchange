import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import ClientLink from "../../components/UI/ClientLink";
import MyCard from "../../components/UI/MyCard";
import { useColors } from "../../hooks/useColors";
import Image from "../../components/UI/Image";
import MyButton from "../../components/UI/MyButton";
import Footer from "../../components/Footer";
import Carousel from "../../components/UI/Carousel";
import { SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Scrollbar } from "swiper/modules";

type Props = {};

const Home = (props: Props) => {
  const colors = useColors();
  return (
    <Carousel
      sx={{ height: "calc(100vh - 64px)", width: "100%" }}
      direction={"vertical"}
      slidesPerView={1}
      spaceBetween={30}
      mousewheel
      scrollbar={{ draggable: true }}
      keyboard
      modules={[Mousewheel, Scrollbar, Keyboard]}
    >
      <SwiperSlide>
        <Container>
          <MyCard sx={{ flexDirection: "row", gap: 10 }}>
            <Stack sx={{ flex: 1 }} spacing={2}>
              <ClientLink disableHoverEffect to={"/recipe"}>
                <Typography variant="h2" component={"h2"} sx={{ fontWeight: 700, textWrap: "pretty" }}>
                  Find your favorite recipes{" "}
                  <span style={{ textDecoration: "underline", color: colors.palette.grey[700] }}>now!</span>
                </Typography>
              </ClientLink>
              <Typography variant="h6" component={"h1"} sx={{ fontWeight: 500, textWrap: "pretty" }}>
                Our recipe exchange platform lets food lovers from around the world share their tastiest creations,
                you'll find endless inspiration here.
              </Typography>
              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                <MyButton size="large" variant="contained">
                  Login
                </MyButton>
                <MyButton size="large" variant="outlined">
                  Register
                </MyButton>
              </Box>
            </Stack>
            <Image
              sx={{ flex: 1 }}
              src="https://static.vecteezy.com/system/resources/thumbnails/021/476/363/small_2x/smiling-woman-cooking-and-listening-to-music-png.png"
            />
          </MyCard>
        </Container>
      </SwiperSlide>
      <SwiperSlide>
        <Box>Idi nahui</Box>
      </SwiperSlide>
    </Carousel>
  );
};

export default Home;
