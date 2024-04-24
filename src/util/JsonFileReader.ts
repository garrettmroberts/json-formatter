class JsonFileReader {
    static async readFile(f: File): Promise<{ [key: string]: any }[]> {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const fileContent = fileReader.result as string;
                const jsonData = JSON.parse(fileContent);
                resolve(jsonData);
            }
            fileReader.onerror = reject;
            fileReader.readAsText(f);
        })
    }
}

export default JsonFileReader;