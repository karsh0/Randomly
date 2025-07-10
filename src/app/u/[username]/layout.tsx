import PublicProfile from "./page"

export default async function Layout({params}:{params:{username: string}}) {
    const { username } = await(params)
    return <PublicProfile username={username}/>
}