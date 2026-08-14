// Документы для скачивания. Пока файла нет — оставляем undefined, и кнопка
// автоматически ведёт в квиз («запросить»), а не в 404. Это важно для рекламы:
// битые ссылки бьют по модерации Директа и по доверию.
//
// Как включить: положите файл в public/documents/ и укажите путь ниже.
export const documents: {
  price?: string;
  certificates?: string;
} = {
  price: undefined, // например: "/documents/price.pdf"
  certificates: undefined, // например: "/documents/certificates.pdf"
};
