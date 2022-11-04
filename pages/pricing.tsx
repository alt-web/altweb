import type { NextPage } from "next"
import { FiCode, FiCloud, FiActivity, FiInfo } from "react-icons/fi"
import Meta from "lib/meta"
import Service from "lib/service"
import styles from "styles/pricing.module.css"

const Pricing: NextPage = () => {
    return (
        <div className={styles.container}>
            <Meta title="Цены" />
            <h2>Цены</h2>
            <Service
                icon={<FiCode />}
                name="Разработка сайта"
                description="Создадим сайт на основе вашего дизайна или придумаем стиль самостоятельно. В итоге мы предоставим вам исходный код и готовые сборки сайта."
                price={40000}
            />
            <Service
                icon={<FiCloud />}
                name="Хостинг"
                description="Разместим ваш сайт в интернете, настроим почту. Мы будем следить за тем, чтобы сайт работал 24/7."
                price={500}
                perMonth={true}
            />
            <Service
                icon={<FiActivity />}
                name="Поддержка проекта"
                description="Устранение критических багов и уязвимостей в сайтах, созданных наших командой."
                price={0}
            />

            <div className={styles.note}>
                <div>
                    <FiInfo />
                </div>
                <div>
                    Цены не являются финальным предложением. Стоимость проекта
                    рассчитывается индивидуально. Точную информацию мы
                    обязательно сообщим вам после обсуждения деталей. Вы можете
                    отказаться в любой момент.
                </div>
            </div>
        </div>
    )
}

export default Pricing
