import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./styles.css";

interface IImageSliderProps {
  url: string;
  limit: number;
  page: number;
}

interface IImageData {
  author: string;
  download_url: string;
  height: number;
  id: string;
  url: string;
  width: number;
}

const ImageSlider = ({ url, limit = 5, page = 1 }: IImageSliderProps) => {
  const [images, setImages] = useState<IImageData[]>([]);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (url === "") return;
    setLoading(true);
    fetch(`${url}?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching images");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, limit, page]);

  const handleClickPrev = () => {
    setCurrentImage((prev) => {
      if (prev === 0) {
        return images.length - 1;
      }
      return prev - 1;
    });
  };

  const handleClickNext = () => {
    setCurrentImage((prev) => {
      if (prev === images.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  const handleClickIndicator = (index: number) => {
    setCurrentImage(index);
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className="wrapper">
      <h1>ImageSlider</h1>
      <div className="container">
        <BsArrowLeftCircleFill
          className="arrow arrow-left"
          onClick={handleClickPrev}
        />
        {images &&
          images.map((image, index) => (
            <img
              key={image.id}
              src={image.download_url}
              alt={image.author}
              className="current-image"
              style={{ display: currentImage === index ? "block" : "none" }}
            />
          ))}

        <BsArrowRightCircleFill
          className="arrow arrow-right"
          onClick={handleClickNext}
        />
        <span className="circle-indicators">
          {images &&
            images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  handleClickIndicator(index);
                }}
                className="current-indicator"
                style={{
                  backgroundColor: currentImage === index ? "white" : "gray",
                }}
              ></button>
            ))}
        </span>
      </div>
    </div>
  );
};

export default ImageSlider;
