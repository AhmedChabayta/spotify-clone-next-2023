const HomeIcon = ({
  className,
  style,
  fill,
}: {
  className: string;
  style: Object;
  fill: string;
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
    >
      <path fill="none" d="M0 0h256v256H0z"></path>
      <path
        fill={fill}
        d="M218.8 103.7l-80-72.7a16 16 0 00-21.6 0l-80 72.7a16 16 0 00-5.2 11.8v92.1a16.4 16.4 0 004 11 15.9 15.9 0 0012 5.4h48a8 8 0 008-8v-48a8 8 0 018-8h32a8 8 0 018 8v48a8 8 0 008 8h48a15.6 15.6 0 007.6-1.9A16.1 16.1 0 00224 208v-92.5a16 16 0 00-5.2-11.8z"
        className="fill-white"
      />
    </svg>
  );
};
export default HomeIcon;
