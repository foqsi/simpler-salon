export default function LargeThrobber() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <span
        className="animate-spin rounded-full border-[12px] border-t-transparent border-primary"
        style={{
          width: '6rem',
          height: '6rem',
        }}
      />
    </div>
  );
}