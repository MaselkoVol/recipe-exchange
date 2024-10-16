import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Import Swiper styles
import "swiper/css";
import { styled, SxProps } from "@mui/material";

const CustomSwiper = styled(Swiper)(({ theme }) => ({}));

type Props = SwiperProps & {
  sx?: SxProps;
  navigation?: boolean;
  pagination?: boolean;
  scrollbar?: boolean;
  slides: React.ReactNode[];
};

const Carousel = ({ sx, navigation, pagination, scrollbar, children, slides, ...rest }: Props) => {
  return (
    <CustomSwiper
      sx={sx}
      modules={[Navigation, Pagination, Scrollbar]}
      navigation={navigation}
      pagination={pagination && { clickable: true }}
      scrollbar={scrollbar && { draggable: true }}
      {...rest}
    >
      {slides.map((item: React.ReactNode, idx: number) => (
        <SwiperSlide key={idx}>{item}</SwiperSlide>
      ))}
    </CustomSwiper>
  );
};

export default Carousel;
