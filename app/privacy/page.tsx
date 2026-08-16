import type { Metadata } from "next";
import Link from "next/link";
import { getSite } from "@/lib/content-source";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
  robots: { index: false, follow: true },
};

// Реквизиты подставляются из content/site.ts — как только появятся данные ООО,
// они автоматически проставятся здесь, в подвале и в разметке.
// Перед публикацией текст стоит показать юристу: типовые шаблоны Роскомнадзор
// штрафует, если они не описывают реальные формы сайта.

const cookieRows = [
  {
    type: "Технически необходимые",
    purpose: "Работа сайта, отправка формы заявки, запоминание вашего выбора по cookie",
    basis: "Согласие не требуется — без них сайт не работает",
    term: "Сессия / до 12 месяцев",
  },
  {
    type: "Аналитические (Яндекс.Метрика)",
    purpose: "Статистика посещений, источники переходов, улучшение сайта",
    basis: "Только с вашего согласия",
    term: "До 12 месяцев",
  },
];

export default async function PrivacyPage() {
  const site = await getSite();
  return (
    <main className="container max-w-3xl py-16">
      <Link href="/" className="font-mono text-[13px] uppercase tracking-[0.14em] text-turquoise">
        ← На главную
      </Link>
      <h1 className="mt-6 font-display text-[clamp(32px,4.5vw,52px)] font-medium leading-[1.05] text-graphite-900">
        Политика обработки персональных данных
      </h1>

      <div className="mt-8 space-y-6 text-muted-foreground">
        <section>
          <h2 className="font-display text-2xl font-semibold text-graphite-900">1. Общие положения</h2>
          <p className="mt-2">
            Настоящая Политика определяет порядок обработки и защиты персональных данных
            пользователей сайта {site.domain} и действует в отношении всей информации, которую
            оператор может получить о пользователе во время использования сайта.
          </p>
          <p className="mt-2">
            Оператор: {site.legal.entity}, ИНН {site.legal.inn}. Контакт для обращений по вопросам
            обработки персональных данных: {site.phone}.
          </p>
          <p className="mt-2">
            Политика составлена в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ
            «О персональных данных».
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-graphite-900">
            2. Какие данные обрабатываются
          </h2>
          <p className="mt-2">
            Через формы на сайте (заявка и квиз-расчёт) оператор получает: имя, номер телефона,
            а также сведения о заказе, которые вы указываете добровольно — интересующий цвет и
            объём, назначение, ИНН для оформления документов, комментарий.
          </p>
          <p className="mt-2">
            Автоматически при посещении сайта могут обрабатываться: IP-адрес, данные cookie,
            информация о браузере и устройстве, источник перехода и рекламные метки (UTM,
            идентификатор клика рекламной системы), время и продолжительность визита.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-graphite-900">3. Цели обработки</h2>
          <p className="mt-2">
            Обработка ведётся исключительно для: связи с вами по оставленной заявке, подготовки
            коммерческого предложения и расчёта, оформления и исполнения договора и отгрузки,
            а также для анализа посещаемости сайта и оценки эффективности рекламы (при вашем
            согласии на аналитические cookie).
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-graphite-900">
            4. Правовые основания и сроки
          </h2>
          <p className="mt-2">
            Основание обработки — согласие субъекта персональных данных, которое вы даёте, отмечая
            соответствующий чекбокс при отправке формы, а также заключение и исполнение договора.
            Данные хранятся не дольше, чем этого требуют цели обработки, либо до отзыва согласия.
          </p>
          <p className="mt-2">
            Данные не передаются третьим лицам, за исключением случаев, прямо предусмотренных
            законодательством РФ, и случаев, когда передача необходима для исполнения вашего
            заказа (например, транспортной компании для доставки).
          </p>
        </section>

        <section id="cookies" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-semibold text-graphite-900">
            5. Использование cookie
          </h2>
          <p className="mt-2">
            Cookie — небольшие файлы, которые сохраняются в вашем браузере. Часть из них позволяет
            выделить пользователя, поэтому мы относимся к ним как к персональным данным.
          </p>
          <p className="mt-2">
            При первом посещении сайта вы выбираете, разрешить ли аналитические cookie.
            Технически необходимые cookie используются всегда — без них сайт и форма заявки
            не работают. Аналитические cookie (Яндекс.Метрика) подключаются только после того,
            как вы нажали «Принять все»; до этого их скрипты не загружаются.
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-graphite-900">
                  <th className="py-2 pr-4 font-semibold">Категория</th>
                  <th className="py-2 pr-4 font-semibold">Назначение</th>
                  <th className="py-2 pr-4 font-semibold">Основание</th>
                  <th className="py-2 font-semibold">Срок</th>
                </tr>
              </thead>
              <tbody>
                {cookieRows.map((r) => (
                  <tr key={r.type} className="border-b border-border align-top">
                    <td className="py-3 pr-4 text-graphite-900">{r.type}</td>
                    <td className="py-3 pr-4">{r.purpose}</td>
                    <td className="py-3 pr-4">{r.basis}</td>
                    <td className="py-3">{r.term}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4">
            Срок действия согласия — 12 месяцев, после чего запрос показывается повторно. Изменить
            решение можно в любой момент через ссылку «Настройки cookie» в подвале сайта или
            очистив данные сайта в настройках браузера.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-graphite-900">6. Ваши права</h2>
          <p className="mt-2">
            Вы вправе получить информацию об обработке ваших данных, потребовать их уточнения,
            блокирования или уничтожения, а также отозвать согласие на обработку. Для этого
            направьте обращение по телефону {site.phone}. Оператор рассматривает обращение и
            прекращает обработку в сроки, установленные 152-ФЗ.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-graphite-900">
            7. Защита данных и изменения политики
          </h2>
          <p className="mt-2">
            Оператор принимает правовые, организационные и технические меры для защиты
            персональных данных от неправомерного доступа, уничтожения, изменения и иных
            неправомерных действий. Соединение с сайтом защищено протоколом HTTPS.
          </p>
          <p className="mt-2">
            Оператор вправе вносить изменения в настоящую Политику. Актуальная редакция всегда
            размещена на этой странице.
          </p>
        </section>
      </div>
    </main>
  );
}
