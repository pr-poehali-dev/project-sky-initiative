import { useState, useEffect, useRef } from "react"

const photos = [
  {
    id: 1,
    title: "Коттедж снаружи",
    category: "Экстерьер",
    description: "Деревянный дом в окружении леса",
    image: "https://cdn.poehali.dev/projects/8bb8bd22-aaf0-4889-8b73-a44544d21fb5/files/af34883b-4e9c-46fd-b758-d84fafcd7d0b.jpg",
  },
  {
    id: 2,
    title: "Гостиная",
    category: "Интерьер",
    description: "Уютная гостиная с камином",
    image: "https://cdn.poehali.dev/projects/8bb8bd22-aaf0-4889-8b73-a44544d21fb5/files/0fd519ca-ea5d-402a-b0ce-4492b4cfb08d.jpg",
  },
  {
    id: 3,
    title: "Сауна",
    category: "Сауна и баня",
    description: "Финская сауна с горячими камнями",
    image: "https://cdn.poehali.dev/projects/8bb8bd22-aaf0-4889-8b73-a44544d21fb5/files/5c270fa7-7032-4368-b82e-973e340b8fbb.jpg",
  },
  {
    id: 4,
    title: "Баня на улице",
    category: "Сауна и баня",
    description: "Деревянная купель и баня у леса",
    image: "https://cdn.poehali.dev/projects/8bb8bd22-aaf0-4889-8b73-a44544d21fb5/files/494ecdee-0f36-4187-bd3d-9740e5dfdde3.jpg",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
          if (index !== -1) {
            setRevealedImages((prev) => new Set(prev).add(photos[index].id))
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Галерея</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Фото коттеджа</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {photos.map((photo, index) => (
            <article
              key={photo.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={photo.image || "/placeholder.svg"}
                  alt={photo.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === photo.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(photo.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">{photo.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {photo.category} · {photo.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
