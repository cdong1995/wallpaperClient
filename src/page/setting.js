import { Select, InputNumber,Button, Divider} from 'antd';
import React from "react";

const Option = Select.Option;

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class Setting extends React.Component {
    state = {
        fre:"3",
        msr:"minute"
    };

    handleChange1 = (value) => {
        console.log(`selected ${value}`);
        this.setState({fre:value})
    };

    handleChange2 = (value) => {
        console.log(`selected ${value}`);
        this.setState({msr:value})
            // this.setState({
            //   Username : event.target.value,
            // })
    };

    setPeriod = () => {
        ipcRenderer.send('change_period', this.state.fre, this.state.msr);
    };

    setStop = () =>{
        ipcRenderer.send('stop_autochanger', '');
    };

    selectFolder = (type) => {
        ipcRenderer.send('set_folder', type);
    };

    render(){
        return(
            <div style={{ marginTop: 150 }}>
                <div>
                    <Button type="primary" icon="download" size="large" onClick={() => this.selectFolder("download")}>Select Download Folder</Button>
                    <Divider type="vertical" />
                    <Button type="primary" icon="download" size="large" onClick={() => this.selectFolder("autoChanger")}>Change Wallpapers From Folder</Button>
                </div>
                <Divider />
                <h3> Set the frequency of wallpaper changing automatically:</h3>
                <br/>
                Every
                <InputNumber min={1} max={100} defaultValue={3} onChange={this.handleChange1} />
                <Select defaultValue="minutes" style={{ width: 120 }} onChange={this.handleChange2}>
                    <Option value="seconds">seconds</Option>
                    <Option value="minutes">minutes</Option>
                    <Option value="hours">hours</Option>
                    <Option value="days">days</Option>
                    <Option value="weeks">weeks</Option>
                </Select>
                <Divider type="vertical" />
                <Button type="primary"  onClick={this.setPeriod}>Set!</Button>
                <Divider type="vertical" />
                <Button type="danger"  onClick={this.setStop}>Stop!</Button>
            </div>
        )}
}

export default Setting;