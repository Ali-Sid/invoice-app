import "./App.css";

//components imports
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
// import Expense from "./ExpenseReport/Expense";

const App = () => {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "60px" }}>
        <Home />
      </div>
      {/* <Expense /> */}
    </>
  );
};

export default App;
