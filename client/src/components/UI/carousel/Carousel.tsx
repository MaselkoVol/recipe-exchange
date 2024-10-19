import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { styled, SxProps } from "@mui/material";
import { FC } from "react";
import "./Carousel.css";

const CustomSwiper = styled(Swiper)(({ theme }) => ({}));

type Props = SwiperProps & {
  sx?: SxProps;
  navigation?: boolean;
  pagination?: boolean;
  scrollbar?: boolean;
  children: React.ReactNode;
};

const Carousel: FC<Props> = ({ sx, navigation, pagination, scrollbar, children, ...rest }) => {
  return (
    <CustomSwiper
      sx={sx}
      modules={[Navigation, Pagination, Scrollbar]}
      navigation={navigation} // Correctly pass navigation
      pagination={pagination && { clickable: true }} // Pass pagination
      scrollbar={scrollbar && { draggable: true }} // Pass scrollbar
      {...rest}
    >
      {children}
    </CustomSwiper>
  );
};

export default Carousel;
