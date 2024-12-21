import Footer from "../../components/Footer";
import Header from "../../components/Header";
import UserMenu from "../../components/User/UserMenu";
import { useAuthContext } from "../../context/authcontext";

function Dashboard() {
  const [auth] = useAuthContext();
  return (
    <>
      <Header />
      <h1 className="text-center text-4xl">Dashboard</h1>
      <section className="container mx-auto flex justify-start items-start ">
        <UserMenu />
        <div>
          <h2>Your Information</h2>
          <h3>{auth?.user?.name}</h3>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Dashboard;
