"use client";

import { BookDemoHero } from "./BookDemoHero/BookDemoHero";
import { BookDemoForm } from "./BookDemoForm/BookDemoForm";
import { BookDemoFaq } from "./BookDemoFaq/BookDemoFaq";

export function BookDemo() {
  return (
    <>
      <BookDemoHero />
      <BookDemoForm />
      <BookDemoFaq />
    </>
  );
}
