function Email({ name, register }) {
  return (
    <>
      <p className="tiny_text">{name} Email Address</p>
      <input
        type="text"
        placeholder={`Your ${name} email address`}
        {...register("email")}
      />
    </>
  );
}

export default Email;
