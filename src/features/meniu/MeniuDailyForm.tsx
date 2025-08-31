"use client";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMeniuData } from "@/hooks/useDataMeniuData";
import ButtonNavigationPage from "@/components/meniu/ButtonNavigationPage";
import { useSwipeable } from "react-swipeable";

// import { useSwipeable } from "react-swipeable";

export default function DailyMenuForm() {
  const { data, isLoading, error } = useMeniuData();
  console.log(data);
  const dataDaily = data && data.daily;
  const t = useTranslations("Meniu");
  const router = useRouter();

  const left = `/meniu-vip/`;
  const right = `/meniu-vip/`;

  const handlers = useSwipeable({
    onSwipedLeft: () => router.push(right),
    onSwipedRight: () => router.push(left),
  });

  return (
    <div
      {...handlers}
      className="flex flex-col items-center justify-center w-full relative tracking-wider"
    >
      <ButtonNavigationPage leftPage="/meniu-vip" rightPage="/meniu-vip" />
      <h1 className="flex justify-center items-center font-bold text-[20px] py-5 ">
        <Image src="../dot.svg" width={16} height={16} priority alt="dot" />
        {t("Salds & Appetixers")}
        <Image src="../dot.svg" width={16} height={16} priority alt="dot" />
      </h1>
      <div className="flex flex-col w-full justify-center items-center gap-4 text-[16px] pt-1 ">
        <ul className="list-none flex flex-col items-center justify-center">
          {dataDaily?.titleSalad?.map((el: any, id: number) => (
            <li key={id} className={id % 2 === 0 ? "font-bold" : ""}>
              {id % 2 === 0 ? t(el) : el}
            </li>
          ))}
        </ul>
      </div>
      <h1 className="flex justify-center items-center font-bold text-[20px] py-5">
        <Image src="../dot.svg" width={16} height={16} priority alt="dot" />
        {t("Second Courses")}
        <Image src="../dot.svg" width={16} height={16} priority alt="dot" />
      </h1>
      <div className="flex flex-col w-full justify-center items-center gap-4 text-[16px] pt-1 ">
        <ul className="list-none  flex flex-col items-center justify-center">
          {dataDaily?.titleSecond?.map((el: any, id: number) => (
            <li key={id} className={id % 2 === 0 ? "font-bold" : ""}>
              {id % 2 === 0 ? t(el) : el}
            </li>
          ))}
        </ul>
      </div>
      <h1 className="flex justify-center items-center font-bold text-[20px] py-5">
        <Image src="../dot.svg" width={16} height={16} priority alt="dot" />
        {t("Soups")}
        <Image src="../dot.svg" width={16} height={16} priority alt="dot" />
      </h1>
      <div className="flex flex-col w-full justify-center items-center gap-4 text-[16px] pt-1 ">
        <ul className="list-none w-1/2 flex flex-col items-center justify-center">
          {dataDaily?.titleMain?.map((el: any, id: number) => (
            <li key={id} className={id % 2 === 0 ? "font-bold" : ""}>
              {id % 2 === 0 ? t(el) : el}
            </li>
          ))}
        </ul>
      </div>
      <h1 className="flex justify-center items-center font-bold text-[20px] py-5">
        <Image src="../dot.svg" width={16} height={16} priority alt="dot" />
        {t("Side Dishes")}
        <Image src="../dot.svg" width={16} height={16} priority alt="dot" />
      </h1>
      <h1 className="flex justify-center items-center font-bold text-[20px] py-5">
        <Image src="../dot.svg" width={16} height={16} priority alt="dot" />
        {t("Desserts")}
        <Image src="../dot.svg" width={16} height={16} priority alt="dot" />
      </h1>
      <div className="flex flex-col w-full justify-center items-center gap-4 text-[16px] pt-1 ">
        <ul className="list-none w-1/2 flex flex-col items-center justify-center">
          {dataDaily?.titleDesserts?.map((el: any, id: number) => (
            <li key={id} className={id % 2 === 0 ? "font-bold" : ""}>
              {id % 2 === 0 ? t(el) : el}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
