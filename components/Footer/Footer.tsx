import css from "./Footer.module.css"

export default function Footer() {
  return (
    <footer className={css.footer}>
  <div className={css.content}>
    <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
    <div className={css.wrap}>
      <p>Developer: Anastasiia</p>
      <p>
        Contact us:
        <a href="<https://github.com/A-nastasiia>">Nikolaienko Anastasiia</a>
      </p>
    </div>
  </div>
</footer>

  );
}
