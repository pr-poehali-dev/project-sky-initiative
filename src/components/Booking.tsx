import { useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"

const BOOKED_RANGES: { from: Date; to: Date }[] = [
  { from: new Date(2026, 3, 20), to: new Date(2026, 3, 23) },
  { from: new Date(2026, 3, 28), to: new Date(2026, 3, 30) },
  { from: new Date(2026, 4, 5), to: new Date(2026, 4, 8) },
  { from: new Date(2026, 4, 14), to: new Date(2026, 4, 17) },
]

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isBooked(date: Date) {
  return BOOKED_RANGES.some(({ from, to }) => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    const f = new Date(from); f.setHours(0, 0, 0, 0)
    const t = new Date(to); t.setHours(0, 0, 0, 0)
    return d >= f && d <= t
  })
}

function isPast(date: Date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

function isInRange(date: Date, from: Date | null, to: Date | null) {
  if (!from || !to) return false
  const d = new Date(date); d.setHours(0, 0, 0, 0)
  const f = new Date(from); f.setHours(0, 0, 0, 0)
  const t = new Date(to); t.setHours(0, 0, 0, 0)
  return d > f && d < t
}

const MONTHS = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]
const DAYS = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"]

export function Booking() {
  const today = new Date()
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectFrom, setSelectFrom] = useState<Date | null>(null)
  const [selectTo, setSelectTo] = useState<Date | null>(null)
  const [selecting, setSelecting] = useState<"from" | "to">("from")

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  let startDow = firstDay.getDay()
  if (startDow === 0) startDow = 7
  const offset = startDow - 1

  const days: (Date | null)[] = []
  for (let i = 0; i < offset; i++) days.push(null)
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d))

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1))

  const handleDayClick = (date: Date) => {
    if (isPast(date) || isBooked(date)) return
    if (selecting === "from") {
      setSelectFrom(date)
      setSelectTo(null)
      setSelecting("to")
    } else {
      if (date <= selectFrom!) {
        setSelectFrom(date)
        setSelectTo(null)
        setSelecting("to")
        return
      }
      const rangeHasBooked = BOOKED_RANGES.some(({ from, to }) => {
        const f = new Date(from); f.setHours(0,0,0,0)
        const t = new Date(to); t.setHours(0,0,0,0)
        const sf = new Date(selectFrom!); sf.setHours(0,0,0,0)
        const sd = new Date(date); sd.setHours(0,0,0,0)
        return f <= sd && t >= sf
      })
      if (rangeHasBooked) {
        setSelectFrom(date)
        setSelectTo(null)
        setSelecting("to")
        return
      }
      setSelectTo(date)
      setSelecting("from")
    }
  }

  const nights = selectFrom && selectTo
    ? Math.round((selectTo.getTime() - selectFrom.getTime()) / 86400000)
    : null

  const formatDate = (d: Date) =>
    d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })

  return (
    <section id="booking" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Бронирование</p>
          <h2 className="text-5xl font-medium leading-[1.15] tracking-tight mb-4 text-balance lg:text-6xl">
            Проверьте <HighlightedText>доступность</HighlightedText>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Выберите даты заезда и выезда, чтобы проверить, свободен ли коттедж в нужный период.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Calendar */}
          <div className="bg-background border border-border p-8">
            <div className="flex items-center justify-between mb-8">
              <button onClick={prevMonth} className="p-2 hover:bg-secondary rounded transition-colors">
                <Icon name="ChevronLeft" size={20} />
              </button>
              <span className="font-medium text-lg">{MONTHS[month]} {year}</span>
              <button onClick={nextMonth} className="p-2 hover:bg-secondary rounded transition-colors">
                <Icon name="ChevronRight" size={20} />
              </button>
            </div>

            <div className="grid grid-cols-7 mb-2">
              {DAYS.map((d) => (
                <div key={d} className="text-center text-xs text-muted-foreground font-medium py-1">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1">
              {days.map((date, i) => {
                if (!date) return <div key={`empty-${i}`} />
                const booked = isBooked(date)
                const past = isPast(date)
                const isFrom = selectFrom && isSameDay(date, selectFrom)
                const isTo = selectTo && isSameDay(date, selectTo)
                const inRange = isInRange(date, selectFrom, selectTo)
                const disabled = booked || past

                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => handleDayClick(date)}
                    disabled={disabled}
                    className={[
                      "relative h-10 w-full text-sm transition-all duration-150 rounded-sm",
                      disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-foreground/10",
                      booked ? "bg-red-100 text-red-400 line-through" : "",
                      past && !booked ? "text-muted-foreground/40" : "",
                      isFrom || isTo ? "bg-foreground text-background font-medium" : "",
                      inRange && !booked ? "bg-foreground/10" : "",
                    ].join(" ")}
                  >
                    {date.getDate()}
                  </button>
                )
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-foreground" />
                Выбрано
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-red-100" />
                Занято
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-foreground/10" />
                Ваш период
              </div>
            </div>
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-6">
            <div className="border border-border p-8 bg-background">
              <h3 className="text-xl font-medium mb-6">Ваш выбор</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground text-sm">Заезд</span>
                  <span className="font-medium">{selectFrom ? formatDate(selectFrom) : "—"}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground text-sm">Выезд</span>
                  <span className="font-medium">{selectTo ? formatDate(selectTo) : "—"}</span>
                </div>
                {nights && (
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground text-sm">Количество ночей</span>
                    <span className="font-medium">{nights}</span>
                  </div>
                )}
              </div>

              {selectFrom && selectTo ? (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-sm">
                  <div className="flex items-center gap-2 text-green-700">
                    <Icon name="CheckCircle" size={18} />
                    <span className="text-sm font-medium">Период свободен!</span>
                  </div>
                  <p className="text-green-600 text-sm mt-1">Свяжитесь с нами для подтверждения бронирования.</p>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm mt-6">
                  {selecting === "from" ? "Кликните на дату заезда в календаре" : "Теперь выберите дату выезда"}
                </p>
              )}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 text-sm tracking-wide hover:bg-foreground/80 transition-colors duration-300 group"
            >
              Забронировать
              <Icon name="ArrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
