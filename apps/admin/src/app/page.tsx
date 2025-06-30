import { log } from "@repo/logger";

export const metadata = {
  title: "Store | Kitchen Sink",
};

export default function Store() {
  log("Hey! This is the Docs page.");

  return (
    <div className="container">
      <h1 className="title">
        Store <br />
        <span>Kitchen Sink</span>
      </h1>
      <p className="description">
        Built With{" "}
        <a href="https://turborepo.com" target="_blank" rel="noopener noreferrer">
          Turborepo
        </a>
        {" & "}
        <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
          Next.js
        </a>
      </p>
    </div>
  );
}
