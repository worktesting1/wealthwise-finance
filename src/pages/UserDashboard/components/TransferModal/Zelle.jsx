function Zelle({ register }) {
  return (
    <>
      <p className="tiny_text">Zelle email</p>
      <input
        type="text"
        placeholder="Your Zelle Email"
        {...register("email")}
      />
      <p className="tiny_text">Phone Number</p>
      <input
        type="text"
        placeholder="Enter Phone Number Associated with account"
        {...register("phone")}
      />
      <p className="tiny_text">Full Name</p>
      <input type="text" placeholder="Full Name" {...register("fullName")} />
    </>
  );
}

export default Zelle;
