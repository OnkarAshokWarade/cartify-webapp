export default function PageTransition({ children, routeKey }) {
  return (
    <div key={routeKey} className="animate-page-in">
      {children}
    </div>
  );
}
