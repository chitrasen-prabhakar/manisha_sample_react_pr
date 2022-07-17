import {
    AreaChartOutlined,
    PicLeftOutlined,
    RollbackOutlined,
    MailOutlined,
    FileTextOutlined,
    InfoCircleOutlined,
    TableOutlined,
    DesktopOutlined,
    EditOutlined,
    QrcodeOutlined,
    BarChartOutlined,
    TabletOutlined,
    BarsOutlined,
    RetweetOutlined,
    ContactsOutlined,
    UploadOutlined,
    AuditOutlined,
    UserOutlined,
    StopOutlined,
    WalletOutlined,
    BoldOutlined,
    RobotOutlined,
    ProfileOutlined,
    DollarCircleOutlined,
    MobileOutlined,
    ExclamationCircleOutlined,
    QuestionCircleOutlined,
    FileExcelOutlined,
    AppstoreOutlined,
    CloseSquareOutlined,
    FileDoneOutlined,
    WalletFilled,
    RightSquareOutlined,
    FileSyncOutlined
} from "@ant-design/icons";


export const MENULIST = [
    {
        menu: 'Dashboard',
        menuIsVisible: true,
        icon: <AreaChartOutlined />,
        path: '/',
        permission: [],
    },
    {
        menu: 'Leads',
        menuIsVisible: true,
        icon: <PicLeftOutlined />,
        path: '/',
        permission: [],
        nestedMenu: [
            {
                menu: 'Create',
                menuIsVisible: true,
                icon: '',
                path: '/lead/create',
                permission: [],
            },
            {
                menu: 'View',
                menuIsVisible: true,
                icon: '',
                path: '/lead',
                permission: [],
            }
        ]
    },
    
    //Append New Menu Here

];
