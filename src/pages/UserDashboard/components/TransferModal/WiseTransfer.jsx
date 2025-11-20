const WiseTransfer = ({ register }) => {
  return (
    <>
      <p className="tiny_text">Full Name</p>
      <input type="text" placeholder="Full name" {...register("fullName")} />
      <p className="tiny_text">Email Address</p>
      <input type="text" placeholder="Email Address" {...register("email")} />
      <p className="tiny_text">Country</p>
      <input type="text" placeholder="Country" {...register("country")} />
    </>
  );
};

export default WiseTransfer;
