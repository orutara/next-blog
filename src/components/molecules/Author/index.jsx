import Image from "next/image";

export const Author = () => {
  return (
    <div className="bg-white py-10 px-5 mb-8">
      <div className="mb-8">
        <Image src="/img_profile.png" alt={'管理人'} width={130} height={130} className="rounded-[50%] mx-auto" />
      </div>
      <p className="text-dark text-center mb-4 font-bold text-[20px]">
        <span itemProp="name">タイラ</span>
      </p>
      <p className="text-xs leading-7 text-mat tracking-wider">
        LPgraphの管理人 | 30歳 | 生まれも育ちも北海道。フロントエンドエンジニア兼Webデザイナー兼SEO担当（歴合計3年）。
      </p>
    </div>
  );
};
