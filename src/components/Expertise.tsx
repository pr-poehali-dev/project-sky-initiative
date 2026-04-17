import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"

const amenities = [
  {
    title: "Сауна и баня",
    description: "Финская сауна и деревянная баня с горячими камнями. Идеально для расслабления после прогулки по лесу.",
    icon: "Flame",
  },
  {
    title: "Мангальная зона",
    description:
      "Просторная терраса с мангалом и беседкой. Шашлыки под открытым небом — классика загородного отдыха.",
    icon: "UtensilsCrossed",
  },
  {
    title: "Уютная гостиная",
    description:
      "Камин, мягкие диваны, телевизор. Вечера в тёплой компании после насыщенного дня на природе.",
    icon: "Sofa",
  },
  {
    title: "Природа и лес",
    description:
      "Коттедж окружён сосновым лесом. Прогулки, тишина, свежий воздух — настоящий отдых без городского шума.",
    icon: "Trees",
  },
  {
    title: "Полностью оборудованная кухня",
    description: "Холодильник, плита, микроволновка, посуда — всё необходимое, чтобы готовить как дома.",
    icon: "ChefHat",
  },
  {
    title: "Wi-Fi и парковка",
    description:
      "Бесплатный Wi-Fi на всей территории и закрытая парковка для вашего автомобиля.",
    icon: "Wifi",
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
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
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Что включено</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            <HighlightedText>Удобства</HighlightedText>,
            <br />
            которые ждут вас
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Коттедж оснащён всем необходимым для комфортного отдыха — от бани до мангала. Просто приезжайте и наслаждайтесь.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {amenities.map((area, index) => (
            <div
              key={area.title}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              data-index={index}
              className={`relative pl-8 border-l border-border transition-all duration-700 ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className={`transition-all duration-1000 ${
                  visibleItems.includes(index) ? "animate-draw-stroke" : ""
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <Icon name={area.icon} fallback="Star" className="w-10 h-10 mb-4 text-foreground" strokeWidth={1.25} />
              </div>
              <h3 className="text-xl font-medium mb-4">{area.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
