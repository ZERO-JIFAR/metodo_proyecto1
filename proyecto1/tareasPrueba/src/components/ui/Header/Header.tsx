import styles from "./Header.module.css";

export const Header = () => {
    return (
        <div className={styles.containerHeder}>
            <div className={styles.containerTitleHeder}>
                <h2>Administrador de tareas</h2>
            </div>
        </div>
    )
}
