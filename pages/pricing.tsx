import type { NextPage } from "next"
import Meta from "lib/meta"
import Service from "lib/service"

const Pricing: NextPage = () => {
    return (
        <div>
            <Meta title="Цены" />
            <Service
                name="Разработка сайта"
                description="Вы получите полностью готовый проект, с которым сможете делать всё, что душе угодно"
                price={40000}
            />
            <Service
                name="Хостинг"
                description="Разместим ваш сайт в интернете, настроим почту"
                price={1000}
                perMonth={true}
            />
            <Service
                name="Поддержка проекта"
                description="Устранение критических багов и уязвимостей, незначительные изменения"
                price={0}
            />
            <Service
                name="Open-source"
                description="Ваше разрешение на размещение кода в открытом доступе позволит вам получить скидку, а нам
                                  будет приятно"
                discount={-10}
            />
        </div>
    )
}

export default Pricing
