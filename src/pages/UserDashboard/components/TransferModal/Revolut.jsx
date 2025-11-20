function Revolut({ register }) {
  return (
    <>
      <p className="tiny_text">Full Name</p>
      <input
        type="text"
        placeholder="Enter your full name"
        {...register("fullName")}
      />
      <p className="tiny_text">Email Address</p>
      <input
        type="text"
        placeholder="Enter your email address"
        {...register("email")}
      />
      <p className="tiny_text">Phone Number</p>
      <input
        type="text"
        placeholder="Enter your phone number associated with account"
        {...register("phone")}
      />
    </>
  );
}

export default Revolut;
