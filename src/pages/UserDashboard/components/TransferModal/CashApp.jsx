function CashApp({ register }) {
  return (
    <>
      <p className="tiny_text">$Cashtag</p>
      <input type="text" placeholder="Cashapp tag" {...register("cashTag")} />
      <p className="tiny_text">Full Name</p>
      <input
        type="text"
        placeholder="Your full name"
        {...register("fullName")}
      />
    </>
  );
}

export default CashApp;
