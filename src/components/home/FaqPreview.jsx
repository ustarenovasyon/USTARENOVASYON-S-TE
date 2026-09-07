import React, { useEffect, useState } from "react";
import { siteStore } from "@/api/staticStore";
import { faqs as fallbackFaqs } from "@/lib/homeContent";
import FaqAccordion from "@/components/faq/FaqAccordion";
import Reveal from "@/components/common/Reveal";
import TextLink from "@/components/common/TextLink";

// Ana sayfa SSS ön izlemesi — merkezi Faq sisteminden (show_on_home) dinamik.
export default function FaqPreview() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let a = true;
    siteStore.entities.Faq.filter({ status: "published", show_on_home: true }, "order", 8)
      .then((list) => {
        if (!a) return;
        setItems(list.length ? list.map((f) => ({ q: f.question, a: f.answer })) : fallbackFaqs);
      })
      .catch(() => a && setItems(fallbackFaqs));
    return () => { a = false; };
  }, []);

  const faqs = items;

  return (
    <section id="sss" className="bg-background">
      <div className="container-grid py-16 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Sık Sorulan Sorular</span>
          <h2 className="heading-display mt-3 text-3xl sm:text-4xl">Aklınıza Takılanlar</h2>
        </Reveal>

        <div className="mx-auto mt-10 max-w-3xl">
          <FaqAccordion items={faqs} />
        </div>

        <div className="mt-8 text-center">
          <TextLink href="/sik-sorulan-sorular">Tüm Sık Sorulan Soruları Gör</TextLink>
        </div>
      </div>
    </section>
  );
}