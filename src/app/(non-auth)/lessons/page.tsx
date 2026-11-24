import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './style.module.scss';

export const metadata: Metadata = {
    title: 'Урокі | Bel Frontend',
    description: 'Навучальныя матэрыялы па-беларуску: тэорыя і практыка, падрыхтоўка да экзаменаў.',
};

export default function LessonsPage() {
    return (
        <main className={styles.main}>
            <h1>Урокі</h1>
            <p>Тэорыя і практыка па-беларуску для самастойнага навучання.</p>
            <article className={styles.card}>
                <span className={styles.label}>AWS · Падрыхтоўка да сертыфікацыі</span>
                <h2>AWS Certified AI Practitioner</h2>
                <p>Падрыхтоўка да экзамену AIF-C01: асновы штучнага інтэлекту,
                    генератыўныя мадэлі, сэрвісы AWS, бяспека і адказны AI.</p>
                <ul>
                    <li>Тэорыя са схемамі і поўны гайд для друку</li>
                    <li>Трэнажор пытанняў з разборам адказаў</li>
                    <li>Сімуляцыя экзамену, карткі і слоўнік тэрмінаў</li>
                </ul>
                <p>Без рэгістрацыі. Прагрэс захоўваецца ў гэтым браўзеры.</p>
                <a className={styles.start} href="/lessons/aws/aif-c01">Пачаць навучанне</a>
            </article>
            <p>Іншыя ўрокі дадамо пазней.</p>
            <Link href="/">На галоўную</Link>
        </main>
    );
}
