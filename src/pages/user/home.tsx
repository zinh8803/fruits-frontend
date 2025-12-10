import { useState, useEffect } from "react";
import RandomSpin from "../../components/Random/RandomSpin";
import { fetchCards, randomCard } from "../../services/cardService";
import "./home.scss";

type Item = {
  id: string | number;
  name: string;
  image_url: string;
  stars?: number;
  description?: string;
  rarity?: string;
};

export default function Home() {
  const [result, setResult] = useState<Item | null>(null);
  const [cards, setCards] = useState<Item[]>([]);
  const roll = async () => {
    setResult(null); // Reset để RandomSpin quay lại
    const res = await randomCard();
    console.log("randomCard result:", res);
    setResult(res.data?.data ?? res.data); // lấy đúng item nếu trả về dạng {data: [...]}
  };
  useEffect(() => {
    const fetchAllCards = async () => {
      const res = await fetchCards();
      console.log("fetchCards result:", res);
      setCards(res.data?.data ?? res.data); // lấy đúng mảng nếu trả về dạng {data: [...]}
    };
    fetchAllCards();
  }, []);

  return (
    <div className="home">
      {cards.length === 0 ? (
        <div className="home__loading">Đang tải dữ liệu...</div>
      ) : (
        <>
          <RandomSpin items={cards} result={result ?? undefined} />
          <button
            className="home__button"
            onClick={roll}
            disabled={cards.length === 0}>
            quay ngẫu nhiên
          </button>
        </>
      )}
    </div>
  );
}
