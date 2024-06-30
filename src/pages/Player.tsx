interface PlayerProps {
  url: string;
}
export default function Player({ url }: PlayerProps) {
  return (
    <div>
      <iframe src={url} allowFullScreen  ></iframe>
    </div>
  );
}
