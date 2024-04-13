import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state?.user?.value);
  return (
    <>
      {user && (
        <div className="flex justify-center items-center h-screen text-2xl">
          DAH MASUK BANG
        </div>
      )}
      {!user && (
        <div className="flex justify-center items-center h-screen text-2xl">
        BELOM MASUK BANG, REGISTER DULU, ATAU LOGINLAH KALO PUNYA AKUN
      </div>
      )}
    </>
  );
}
