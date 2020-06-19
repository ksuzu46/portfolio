const jpConfig =
    {
        myName: '鈴木 佳輔',
        aboutMe: `フルリモートのアルバイトを探しています。2020年5月に米国の大学を卒業しました。
                プログラミング言語はC++とJavaScriptが得意です。
                フロントエンドの技術やLinuxのカスタマイズなどに興味があります。`,
        linkedinUrl: "https://www.linkedin.com/in/keisuke-suzuki-b77600bb/",
        myGmail: "keisuke.suzuki.46@gmail.com",
        where: "ニューヨーク市",
        mailerUrl: process.env.MAILER_URL,

        projects: [
            {
                name: `plug-and-play-resume`,
                description: `卒業プロジェクト。バックエンドにPython（Django)、
                フロントエンドにJavaScript(Redux, React)を使用しWebアプリケーションを
                開発しました。テキストランクアルゴリズムを使用して、指定された求人情報に最適化
                された履歴書を出力します。基本的な情報を登録し求人情報を指定することで、
                その求人に最適な履歴書が生成されます。`,
                homepageUrl: ``,
                url: `https://github.com/Ks5810/plug-and-play-resume`
            }, {
                name: `nyc-subway-entrances`,
                description: `ニューヨーク市内の地下鉄の駅に関するデータを処理する
                コマンドラインアプリケーションをコースプロジェクトとして実装しました。
                ユーザが入力した座標から、最も近い路線、最も近い入口(出口)、または任意の路線に繋がっている入口などに関する情報を出力
                します。無料で乗り換えが可能な場合(その駅から
                アクセスが可能な路線の集合が等しく、駅間の距離が0.28 km未満)にも対応しました。
                `,
                homepageUrl: ``,
                url: `https://github.com/Ks5810/nyc-subway-entrances`
            }, {
                name: `NYC Trees`,
                description: `ニューヨーク市の通りにある68万本以上
                の樹木に関する情報を含むデータセットを処理するC++プログラム。
                特定の種の樹木の数、区ごと、または任意の座標から指定された距離内にある樹木などに
                関する情報を表示できます。また、特定の種、例えば
                「oak」と入力すると、「pin oak」、「sawtooth oak」、「scarlet oak」など、
                市内に生息する名前に「oak」を含む種の合計なども出力できます。`,
                homepageUrl: ``,
                url: `https://github.com/Ks5810/nyc-trees`
            }, {
                name: `ポートフォリオ`,
                description: `(このページ) React, Webpack, Express.jsなどの技術を使用した、
                ポートフォリオ用のプログレッシブウェブアプリケーション。リバースプロキシに
                Nginxを使用し、AWSのEC2インスタンス上にデプロイしました。`,
                homepageUrl: `https://ksuzu.net`,
                url: `https://github.com/Ks5810/portfolio`
            }, {
                name: `Network Experiment`,
                description: `ルータ間の最短経路を見つけるネットワーキングコースのプロジェクト。
                ベルマンフォードのアルゴリズムを使用しているので、
                エッジの負の重みも処理可能です。各ノードまでの距離の出力、アルゴリズムの実行、実行結果の出力
                が可能なインターフェースを実装しました。`,
                homepageUrl: ``,
                url: `https://github.com/Ks5810/network-experiment`
            }, {
                name: `トラベルマップ`,
                description: `Laravelを使用し、ユーザーの旅行先を管理するウェブアプリケーションを作成しました。
                Google Maps Places APIを利用し住所の入力から地図上に目的地をマークすることを可能にしました。`,
                homepageUrl: `https://travelmap.ksuzu.net`,
                url: `https://github.com/Ks5810/travel-destinations`
            },
        ]
    };

export default jpConfig;