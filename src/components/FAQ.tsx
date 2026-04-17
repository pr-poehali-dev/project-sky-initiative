import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Как забронировать коттедж?",
    answer:
      "Выберите удобные даты в календаре на сайте, убедитесь что период свободен, и свяжитесь с нами по телефону или в мессенджере. Бронирование подтверждается после внесения предоплаты.",
  },
  {
    question: "Сколько человек может разместиться?",
    answer:
      "Коттедж рассчитан на компанию до 10 человек. В доме несколько спальных мест, просторная гостиная и большая кухня для всей компании.",
  },
  {
    question: "Можно ли приехать с животными?",
    answer:
      "Да, мы принимаем гостей с домашними животными. Просьба заранее предупредить об этом при бронировании.",
  },
  {
    question: "Что нужно взять с собой?",
    answer:
      "На кухне есть всё необходимое — посуда, техника. Возьмите продукты, личные вещи и хорошее настроение. Постельное бельё и полотенца предоставляются.",
  },
  {
    question: "Есть ли возможность аренды мангала и дров?",
    answer:
      "Да, на территории есть мангальная зона. Дрова можно приобрести на месте. Уточняйте при бронировании.",
  },
  {
    question: "Каковы условия отмены бронирования?",
    answer:
      "Отмена бронирования за 3 и более дней до заезда — возврат предоплаты в полном объёме. При отмене менее чем за 3 дня — предоплата не возвращается. Подробности уточняйте при бронировании.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
