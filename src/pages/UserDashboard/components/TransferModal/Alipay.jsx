function Alipay({ name, register }) {
  return (
    <>
      <p className="tiny_text">{name} ID</p>
      <input
        type="text"
        placeholder={`Enter your ${name} ID`}
        {...register("id")}
      />
      <p className="tiny_text">Full Name</p>
      <input
        type="text"
        placeholder="Enter your full name"
        {...register("fullName")}
      />
    </>
  );
}

export default Alipay;
