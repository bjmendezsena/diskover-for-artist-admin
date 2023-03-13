import React, { useEffect, useState, useRef } from "react";
import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ReactDOM from "react-dom"
import { PageHeader, Table, Select, Input, Tag, Button, Typography, Tabs } from "antd";
import RoyaltiesModal from "../../../components/RoyaltiesModal";
import ModalPaypalConfirm from "../../../components/ModalPaypalConfirm"
import ModalConfirm from "../../../components/ModalConfirm"
import ModalConfirmWithMessage from "../../../components/ModalConfirmWithMessage"
import ModalInvoice from "../../../components/ModalInvoice"
import ModalInfo from "../../../components/ModalInfo"
import UserInfoPaymentsModal from "../../../components/UserInfoPaymentsModal"
import EditPercent from "../../../components/EditPercent";
import {
    acceptOne,
    getToken,
    rejectOne,
    manualOne
} from "redux/payments/actions";

import { fetchSongs2, fetchLabels2, fetchArtists2, fetchReleases2, fetchPlatforms2, fetchCountries2 } from 'redux/income/actions';

import { fetchAllUsers } from "redux/users/actions";

import {
    CheckOutlined,
    FolderOpenOutlined,
    EditOutlined,
    CheckCircleFilled,
    CloseCircleFilled,
    InfoCircleOutlined
} from "@ant-design/icons";
import { info } from "console";

import countryList from "assets/data/countries";

const { TabPane } = Tabs;


const { Text, Link } = Typography;



function BetterIncome() {


    const dispatch = useDispatch();

    useEffect(() => {

        if (labels.length === 0) {
            dispatch(fetchLabels2());
        }

        if (artists.length === 0) {
            dispatch(fetchArtists2());
        }

        if (songs.length === 0) {
            dispatch(fetchSongs2());
        }

        if (releases.length === 0) {
            dispatch(fetchReleases2());
        }

        if (platforms.length === 0) {
            dispatch(fetchPlatforms2());
        }

        if (countries.length === 0) {
            dispatch(fetchCountries2());
        }


        // dispatch(getToken());

    }, [dispatch]);

    const { songs, labels, artists, releases, platforms, countries, loadingArtists, loadingLabels, loadingReleases, loadingSongs, loadingPlatforms, loadingCountries } = useSelector(
        (state: any) => state.income
    );


    useEffect(() => {
        setArtistsData(artists)
    }, [artists])

    useEffect(() => {
        setLabelsData(labels)
    }, [labels])

    useEffect(() => {
        setReleasesData(releases)
    }, [releases])

    useEffect(() => {
        setSongsData(songs)
    }, [songs])

    useEffect(() => {
        setPlatformsData(platforms)
    }, [platforms])

    useEffect(() => {
        setCountriesData(countries)
    }, [countries])



    const { requests, loading, response, token } = useSelector(
        (state: any) => state.payment_requests
    );

    const { users } = useSelector(
        (state: any) => state.users
    );



    const [songsData, setSongsData] = useState();
    const [labelsData, setLabelsData] = useState();
    const [artistsData, setArtistsData] = useState();
    const [releasesData, setReleasesData] = useState();
    const [platformsData, setPlatformsData] = useState();
    const [countriesData, setCountriesData] = useState();


    const routes = [
        {
            path: "index",
            breadcrumbName: "",
        },
    ];


    const [artistsSearch, setArtistsSearch] = useState("");
    const [labelsSearch, setLabelsSearch] = useState("");
    const [releasesSearch, setReleasesSearch] = useState("");
    const [songsSearch, setSongsSearch] = useState("");
    const [platformsSearch, setPlatformsSearch] = useState("");
    const [countriesSearch, setCountriesSearch] = useState("");


    useEffect(() => {
        const filteredData = artists.filter((e: any) => {
            return e.email.toLowerCase().includes(artistsSearch) ||
                e.total_income.toString().includes(artistsSearch)
        })
        setArtistsData(filteredData)
    }, [artistsSearch, artists])


    useEffect(() => {
        const filteredData = labels.filter((e: any) => {
            return e.labelTitle.toLowerCase().includes(labelsSearch)
                ||
                e.labelId.includes(labelsSearch) ||
                (e.income && e.income.toString().includes(labelsSearch))
        })
        setLabelsData(filteredData)
    }, [labelsSearch, labels])


    useEffect(() => {
        const filteredData = releases.filter((e: any) => {
            return (e.release && e.releaseTitle.toLowerCase().includes(releasesSearch)) ||
                (e.releaseId && e.releaseId.toString().includes(releasesSearch)) ||
                (e.income && e.income.toString().includes(releasesSearch))
        })
        setReleasesData(filteredData)
    }, [releasesSearch, releases])


    useEffect(() => {
        const filteredData = songs.filter((e: any) => {
            return e.title.toLowerCase().includes(songsSearch) ||
                e.isrc.toLowerCase().includes(songsSearch) ||
                e.labelId.toString().includes(songsSearch) ||
                (e.income && e.income.toString().includes(songsSearch))
        })
        setSongsData(filteredData)
    }, [songsSearch, songs])


    useEffect(() => {
        const filteredData = platforms.filter((e: any) => {
            return e.platform.toLowerCase().includes(platformsSearch) ||
                (e.payable && e.payable.toString().includes(platformsSearch))
        })
        setPlatformsData(filteredData)
    }, [platformsSearch, platforms])


    useEffect(() => {
        const filteredData = countries.filter((e: any) => {
            return (e.country && e.country.toLowerCase().includes(countriesSearch)) ||
                (e.payable && e.payable.toString().includes(countriesSearch))
        })
        setCountriesData(filteredData)
    }, [countriesSearch, countries])


    return (
        <div>
            <PageHeader
                title="Mejores Ingresos"
                ghost={false}
                breadcrumb={{ routes }}
            />
            <div className="content_container">
                <Tabs defaultActiveKey="1" onChange={() => { }}>

                    <TabPane tab="Artistas" key="1">
                        <Input
                            style={{
                                width: "144px",
                                height: "40px",
                                backgroundColor: "white",
                                borderRadius: "4px",
                                borderColor: "#0a00ec",
                            }}
                            placeholder="Buscar"
                            onChange={(e) => setArtistsSearch(e.target.value.toLowerCase())}
                        />
                        <Table
                            locale={{ emptyText: 'No hay información' }}
                            pagination={{ pageSize: 10 }}
                            dataSource={artistsData}
                            loading={loadingArtists}
                            rowKey="document"
                            scroll={{ x: 1200 }}
                            style={{
                                marginTop: "20px",
                            }}
                            columns={[
                                {
                                    title: "Email del artista",
                                    dataIndex: "email",
                                    key: "email",
                                    fixed: "left",
                                    width: 200,
                                    sorter: (a, b) => a.email.localeCompare(b.email)

                                },
                                {
                                    title: "Monto",
                                    dataIndex: "total_income",
                                    key: "total_income",
                                    fixed: "left",
                                    width: 200,
                                    render: (data: any, record: any) => {
                                        if (true) {
                                            return data + "€"
                                        }
                                    },
                                    sorter: {
                                        compare: (a, b) => a.total_income - b.total_income,
                                    },
                                },
                            ]}
                        />
                    </TabPane>

                    <TabPane tab="Sellos" key="2">
                        <Input
                            style={{
                                width: "144px",
                                height: "40px",
                                backgroundColor: "white",
                                borderRadius: "4px",
                                borderColor: "#0a00ec",
                            }}
                            placeholder="Buscar"
                            onChange={(e) => setLabelsSearch(e.target.value.toLowerCase())}
                        />
                        <Table
                            locale={{ emptyText: 'No hay información' }}
                            pagination={{ pageSize: 10 }}
                            dataSource={labelsData}
                            loading={loadingLabels}
                            rowKey="document"
                            scroll={{ x: 1200 }}
                            style={{
                                marginTop: "20px",
                            }}
                            columns={[
                                {
                                    title: "Nombre del sello",
                                    dataIndex: "labelTitle",
                                    key: "label_title",
                                    fixed: "left",
                                    width: 200,
                                    sorter: (a, b) => a.label.localeCompare(b.label)

                                },
                                {
                                    title: "Label Id",
                                    dataIndex: "labelId",
                                    key: "label_id",
                                    width: 110,
                                    defaultSortOrder: "descend",
                                    render: (data: any, record: any) =>
                                        data,
                                    sorter: {
                                        compare: (a, b) => a.labelId - b.labelId,
                                    },

                                },
                                {
                                    title: "Monto",
                                    dataIndex: "income",
                                    key: "income",
                                    defaultSortOrder: "descend",
                                    fixed: "left",
                                    align: "center",
                                    width: 120,
                                    render: (data: any, record: any) => {
                                        if (data) {
                                            return data.toFixed(2) + "€"
                                        }
                                    },
                                    sorter: {
                                        compare: (a, b) => a.income - b.income,
                                    },

                                },
                            ]}
                        />
                    </TabPane>
                    <TabPane tab="Lanzamientos" key="3">
                        <Input
                            style={{
                                width: "144px",
                                height: "40px",
                                backgroundColor: "white",
                                borderRadius: "4px",
                                borderColor: "#0a00ec",
                            }}
                            placeholder="Buscar"
                            onChange={(e) => setReleasesSearch(e.target.value.toLowerCase())}
                        />
                        <Table
                            locale={{ emptyText: 'No hay información' }}
                            pagination={{ pageSize: 10 }}
                            dataSource={releasesData}
                            loading={loadingReleases}
                            rowKey="document"
                            scroll={{ x: 1200 }}
                            style={{
                                marginTop: "20px",
                            }}
                            columns={[
                                {
                                    title: "Nombre del lanzamiento",
                                    dataIndex: "releaseTitle",
                                    key: "release_title",
                                    fixed: "left",
                                    width: 200,
                                    sorter: (a, b) => a.label.localeCompare(b.label)
                                },
                                {
                                    title: "ReleaseId",
                                    dataIndex: "releaseID",
                                    key: "release_id",
                                    defaultSortOrder: "descend",
                                    fixed: "left",
                                    align: "center",
                                    width: 120,

                                },
                                {
                                    title: "Monto",
                                    dataIndex: "income",
                                    key: "income",
                                    width: 110,
                                    defaultSortOrder: "descend",
                                    render: (data: any, record: any) => {
                                        if (data) {
                                            return data.toFixed(2) + "€"
                                        }
                                    },
                                    sorter: {
                                        compare: (a, b) => a.income - b.income,
                                    },

                                },
                            ]}
                        />
                    </TabPane>
                    <TabPane tab="Canciones" key="4">
                        <Input
                            style={{
                                width: "144px",
                                height: "40px",
                                backgroundColor: "white",
                                borderRadius: "4px",
                                borderColor: "#0a00ec",
                            }}
                            placeholder="Buscar"
                            onChange={(e) => setSongsSearch(e.target.value.toLowerCase())}
                        />
                        <Table
                            locale={{ emptyText: 'No hay información' }}
                            pagination={{ pageSize: 10 }}
                            dataSource={songsData}
                            loading={loadingSongs}
                            rowKey="document"
                            scroll={{ x: 1200 }}
                            style={{
                                marginTop: "20px",
                            }}
                            columns={[
                                {
                                    title: "Nombre de la canción",
                                    dataIndex: "title",
                                    key: "track_title",
                                    fixed: "left",
                                    width: 200,
                                },
                                {
                                    title: "ISRC",
                                    dataIndex: "isrc",
                                    key: "isrc",
                                    fixed: "left",
                                    width: 200,
                                },
                                {
                                    title: "Label id",
                                    dataIndex: "labelId",
                                    key: "isrc",
                                    fixed: "left",
                                    width: 200,
                                },
                                {
                                    title: "Monto",
                                    dataIndex: "income",
                                    key: "track_amount",
                                    defaultSortOrder: "descend",
                                    fixed: "left",
                                    align: "center",
                                    width: 120,
                                    render: (data: any, record: any) => {
                                        if (data) {
                                            return data.toFixed(2) + "€"
                                        }
                                    },
                                    sorter: {
                                        compare: (a, b) => a.income - b.income,
                                    },
                                },
                            ]}
                        />
                    </TabPane>
                    <TabPane tab="Plataforma" key="5">
                        <Input
                            style={{
                                width: "144px",
                                height: "40px",
                                backgroundColor: "white",
                                borderRadius: "4px",
                                borderColor: "#0a00ec",
                            }}
                            placeholder="Buscar"
                            onChange={(e) => setPlatformsSearch(e.target.value.toLowerCase())}
                        />
                        <Table
                            locale={{ emptyText: 'No hay información' }}
                            pagination={{ pageSize: 10 }}
                            dataSource={platformsData}
                            loading={loadingPlatforms}
                            rowKey="document"
                            scroll={{ x: 1200 }}
                            style={{
                                marginTop: "20px",
                            }}
                            columns={[
                                {
                                    title: "Plataforma",
                                    dataIndex: "platform",
                                    key: "track_title",
                                    fixed: "left",
                                    width: 200,
                                },
                                {
                                    title: "Monto",
                                    dataIndex: "payable",
                                    key: "track_amount",
                                    defaultSortOrder: "descend",
                                    fixed: "left",
                                    align: "center",
                                    width: 120,
                                    render: (data: any, record: any) => {
                                        if (data) {
                                            return data.toFixed(2) + "€"
                                        }
                                    },
                                    sorter: {
                                        compare: (a, b) => a.payable - b.payable,
                                    },
                                },
                            ]}
                        />
                    </TabPane>
                    <TabPane tab="País" key="6">
                        <Input
                            style={{
                                width: "144px",
                                height: "40px",
                                backgroundColor: "white",
                                borderRadius: "4px",
                                borderColor: "#0a00ec",
                            }}
                            placeholder="Buscar"
                            onChange={(e) => setCountriesSearch(e.target.value.toLowerCase())}
                        />
                        <Table
                            locale={{ emptyText: 'No hay información' }}
                            pagination={{ pageSize: 10 }}
                            dataSource={countriesData}
                            loading={loadingCountries}
                            rowKey="document"
                            scroll={{ x: 1200 }}
                            style={{
                                marginTop: "20px",
                            }}
                            columns={[
                                {
                                    title: "País",
                                    dataIndex: "country",
                                    key: "track_title",
                                    fixed: "left",
                                    width: 200,
                                    render: (data: string, record: any) => {
                                        if (data) {
                                            return data
                                        }
                                    },
                                },
                                {
                                    title: "Monto",
                                    dataIndex: "payable",
                                    key: "track_amount",
                                    defaultSortOrder: "descend",
                                    fixed: "left",
                                    align: "center",
                                    width: 120,
                                    render: (data: any, record: any) => {
                                        if (data) {
                                            return data + "€"
                                        }
                                    },
                                    sorter: {
                                        compare: (a, b) => a.payable - b.payable,
                                    },
                                },
                            ]}
                        />
                    </TabPane>
                </Tabs>
                <div>
                </div>
            </div>
        </div>
    );
}

export default BetterIncome;
