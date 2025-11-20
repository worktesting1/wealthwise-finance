function Venmo({ register }) {
  return (
    <>
      <p className="tiny_text">Venmo username</p>
      <input
        type="text"
        placeholder="Your venmo username"
        {...register("userName")}
      />
      <p className="tiny_text">Phone Number</p>
      <input type="text" placeholder="Phone Number" {...register("phone")} />
    </>
  );
}

export default Venmo;
