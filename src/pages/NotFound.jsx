import EmptyState from '../components/EmptyState';

export default function NotFound() {
  return (
    <div className="container-shell">
      <EmptyState
        actionHref="/"
        actionLabel="Return home"
        copy="The page you requested does not exist in this Cartify build."
        title="Page not found"
      />
    </div>
  );
}
