import { NextPage } from "next";
import { useEffect, useState } from "react";

const IndexPage: NextPage = () => {
  // useStateを使って状態を定義
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  // マウント時に画像を読み込む宣言 -useEffect関数（引数を2つ使用する。１つ目は処理内容、2つ目に実行タイミング。今回は空なので、コンポねマウント時の意味になる）
  useEffect(() => {
    fetchImage().then((newImage) => {
      // 画像のURLを更新
      setImageUrl(newImage.url);
      // ローディング状態を更新
      setLoading(false);
    });
  }, []);

  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleClick}>ほかのにゃんこも見る</button>
      <div>{loading || <img src={imageUrl} />}</div>;
    </div>
  );
};

export default IndexPage;

type Image = {
  url: string;
};

const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com./v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};

// fetchImage();
