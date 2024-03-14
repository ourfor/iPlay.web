import Giscus from '@giscus/react';
import { ENV } from '@helper/env';
import style from "./comment.module.scss"

export function Comment() {
    const config = ENV.giscus;
    if (!config || !config?.enabled) return null;
    return (
        <div className={style.root}>
        <Giscus
            id="comments"
            repo={config.repo as any}
            repoId={config.repoId}
            category={config.category}
            categoryId={config.categoryId}
            mapping={config.mapping as any}
            term="Welcome to @giscus/react component!"
            reactionsEnabled={config.reactionsEnabled.toString() as any}
            emitMetadata={config.emitMetadata.toString() as any}
            inputPosition={config.inputPosition as any}
            theme={config.theme as any}
            lang={config.lang}
            loading={config.loading as any}
        />
        </div>
    );
}