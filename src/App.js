function App() {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-xl">
      <span
        className={
          'before:mr-2 before:p-1 before:border before:border-blue-400 before:content-["foo\\_bar"]'
        }
      >
        &larr; Should contain "foo_bar"
      </span>

      <span>
        Note that changing the Tailwind class to use a single slash and then
        back may appear to fix this. However, that is actually generating a new
        class with a single-slash selector, which then matches the previous
        HTML. If you clear the generated CSS between changes, neither a single
        nor double slash will work.
      </span>
    </div>
  );
}

export default App;
