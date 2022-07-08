const InfoBox = ({ title, cases, total }) => {
  return (
    <div className="shadow-md rounded-lg bg-white overflow-hidden">
      <div className="p-4">
        <p>{title}</p>
        <h2 className="font-bold">{cases}</h2>
        <p>{total} Total</p>
      </div>
    </div>
  );
};
export default InfoBox;
