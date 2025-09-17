export default function Hero({ props }) {
  return (
    <section className="bg-indigo-500 text-white p-12 text-center rounded-xl">
      <h1 className="text-4xl font-bold mb-4">{props.title}</h1>
      <p className="text-lg">{props.subtitle}</p>
      {props.bg && (
        <img
          src={props.bg}
          alt="Hero background"
          className="mt-6 rounded-lg mx-auto shadow-lg"
        />
      )}
    </section>
  );
}
