import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Природа рядом",
    description:
      "Коттедж окружён лесом — свежий воздух, тишина и пение птиц каждое утро. Идеальное место, чтобы отдохнуть от городской суеты.",
  },
  {
    title: "Полное уединение",
    description:
      "Вы арендуете весь дом целиком. Никаких соседей, никакого постороннего шума — только ваша компания и уютная атмосфера.",
  },
  {
    title: "Всё включено",
    description:
      "Сауна, баня, мангальная зона — всё готово к использованию. Приезжайте и отдыхайте, мы позаботились обо всём остальном.",
  },
  {
    title: "Любое время года",
    description: "Летом — природа и свежий воздух, зимой — сугробы и горячая баня. Коттедж принимает гостей круглый год.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">О коттедже</p>
            <h2 className="text-6xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Отдых с
              <br />
              <HighlightedText>душой</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="https://cdn.poehali.dev/projects/8bb8bd22-aaf0-4889-8b73-a44544d21fb5/files/0fd519ca-ea5d-402a-b0ce-4492b4cfb08d.jpg"
                alt="Уютный интерьер коттеджа"
                className="opacity-90 relative z-10 w-full rounded-sm object-cover h-72"
              />
            </div>
          </div>

          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Уютный деревянный коттедж в окружении леса — идеальное место для отдыха с семьёй или друзьями. Баня, сауна, природа и полный покой ждут вас.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
