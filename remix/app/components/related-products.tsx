import { componentContent } from "../crystallize/utils/componentContent";
import { ProductQuery } from "../crystallize/queries/product.generated";
import { Image } from "@crystallize/react-image";
import { Link } from "remix";

interface RelatedProductProps {
  related: ProductQuery["product"]["related"];
}

export const RelatedProducts = ({ related }: RelatedProductProps) => {
  const getLastItem = (url) => url.substring(url.lastIndexOf("/") + 1);

  return (
    <div className="flex w-full items-start  gap-5">
      {componentContent(related.content, "ItemRelationsContent").items.map(
        (item, index) => (
          <Link
            to={"/" + getLastItem(item.path)}
            key={index}
            className="bg-primary px-4 py-3 rounded-xl border-2 border-grey w-4/12"
          >
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div className="flex gap-1">
                  {item.topics?.map((topic) => (
                    <div
                      className="text-sm bg-grey px-2 py-1 rounded-2xl"
                      key={topic.name}
                    >
                      {topic.name}
                    </div>
                  ))}
                </div>
                <div>
                  ${componentContent(item, "Product").defaultVariant.price}
                </div>
              </div>

              <Image
                {...componentContent(item, "Product").defaultVariant.firstImage}
              />
              <h2 className="text-l text-center m-auto">{item.name}</h2>
            </div>
          </Link>
        )
      )}
    </div>
  );
};
