class DataService {

    _dataUrl = 'http://localhost:3000/data/data.json';

    async getData() {
        const res = await fetch(this._dataUrl);

        if (!res.ok) {
            throw new Error(`Could not fetch ${this._dataUrl}` +
                `, received ${res.status}`)
        }

        return await res.json();
    }
}

export default DataService