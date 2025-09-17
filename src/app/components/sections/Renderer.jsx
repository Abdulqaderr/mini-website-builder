export default function Renderer({ props }) {
  if (!props) return <div>No props received</div>;

  return (
    <div className="p-4 bg-gray-50 rounded">
      <h3 className="text-xl font-bold">{props.title || "No title"}</h3>
      <p>{props.description || "No description"}</p>
    </div>
  );
}
